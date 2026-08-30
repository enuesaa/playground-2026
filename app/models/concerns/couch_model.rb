# Minimal CouchDB-backed model, standing in for ActiveRecord.
#
# Each including class gets its own CouchDB database (via `database_name`)
# and a plain list of JSON attributes (via `attributes`). There are no
# associations or validations here on purpose -- this is a small sample API,
# and cross-model references (e.g. Stock#book_id) are just plain ids resolved
# by the controllers.
module CouchModel
  extend ActiveSupport::Concern

  class RecordNotFound < StandardError; end

  included do
    class_attribute :couch_database_name, instance_writer: false
    class_attribute :couch_attribute_names, instance_writer: false, default: []
  end

  class_methods do
    def database_name(name)
      self.couch_database_name = name
    end

    def attributes(*names)
      self.couch_attribute_names = names
      attr_accessor(*names)
    end

    def database
      CouchdbConnection.database(couch_database_name)
    end

    def all
      database.all_docs(include_docs: true)["rows"].map { |row| build_from_doc(row["doc"]) }
    end

    def find(id)
      doc = database.get(id)
      raise RecordNotFound, "Couldn't find #{name} with id=#{id}" if doc.nil?

      build_from_doc(doc)
    end

    def where(conditions = {})
      all.select { |record| conditions.all? { |key, value| record.public_send(key).to_s == value.to_s } }
    end

    def find_by(conditions = {})
      where(conditions).first
    end

    def create(params = {})
      record = new(params)
      record.save
      record
    end

    def build_from_doc(doc)
      record = new
      record.id = doc["_id"]
      record.rev = doc["_rev"]
      couch_attribute_names.each { |attr| record.public_send("#{attr}=", doc[attr.to_s]) }
      record
    end
  end

  attr_accessor :id, :rev

  def initialize(params = {})
    params.each { |key, value| public_send("#{key}=", value) if respond_to?("#{key}=") }
  end

  def persisted?
    id.present?
  end

  def attributes
    self.class.couch_attribute_names.index_with { |attr| public_send(attr) }
  end

  def as_json(*)
    attributes.stringify_keys.merge("id" => id)
  end

  def save
    doc = attributes.stringify_keys.merge("type" => self.class.name.underscore)
    doc["_id"] = id if id.present?
    doc["_rev"] = rev if rev.present?

    result = self.class.database.save_doc(doc)
    self.id = result["id"]
    self.rev = result["rev"]
    true
  end

  def update(params = {})
    params.each { |key, value| public_send("#{key}=", value) if respond_to?("#{key}=") }
    save
  end

  def destroy
    self.class.database.delete_doc("_id" => id, "_rev" => rev)
    true
  end
end
