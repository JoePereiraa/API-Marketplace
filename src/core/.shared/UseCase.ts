interface UseCase<Request, Reply> {
    execute(request: Request): Promise<Reply>
}

export { UseCase }