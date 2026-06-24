FROM public.ecr.aws/lambda/microvms:al2023-minimal

# RUN dnf install -y python3 python3-pip
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /workspace

COPY . .
RUN uv sync

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app"]
