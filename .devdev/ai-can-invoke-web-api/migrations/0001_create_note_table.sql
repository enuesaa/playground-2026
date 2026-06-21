-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "desc" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_title_key" ON "Note"("title");
