import logging
import azure.functions as func

app = func.FunctionApp()

@app.function_name(name="Health")
@app.route(route="health", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def health(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Health check called")

    return func.HttpResponse(
        body="OK",
        status_code=200
    )

@app.function_name(name="Echo")
@app.route(route="echo", methods=["GET", "POST"], auth_level=func.AuthLevel.ANONYMOUS)
def echo(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Echo handler called")

    name = req.params.get("name")
    if not name:
        try:
            body = req.get_json()
            name = body.get("name")
        except ValueError:
            pass

    if not name:
        logging.warning("name parameter is missing")
        return func.HttpResponse(
            body="name is required",
            status_code=400
        )

    logging.info(f"Echo name={name}")

    return func.HttpResponse(
        body=f"hello {name}",
        status_code=200
    )
