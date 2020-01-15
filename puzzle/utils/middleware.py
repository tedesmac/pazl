import puzzle.utils.jwt as jwt


class PuzzleMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.get_signed_cookie('puzzle_token', '')
        user = jwt.validate(token)
        request.user = user

        if user:
            request.is_authenticated = True
        else:
            request.is_authenticated = False

        response = self.get_response(request)

        if user:
            response.set_signed_cookie('puzzle_token', jwt.generate(user))
        return response
