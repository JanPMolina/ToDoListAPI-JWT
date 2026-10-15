// Traduce HTTP <-> servicio de autenticación.
export function createAuthController(authService) {
    return {
        async register(req, res) {
            res.status(201).json(await authService.register(req.body));
        },

        async login(req, res) {
            res.json(await authService.login(req.body));
        },

        // req.user lo deja el middleware requireAuth a partir del token.
        me(req, res) {
            res.json(req.user);
        },
    };
}
