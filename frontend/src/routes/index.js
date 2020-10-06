import authRoutes from "./auth.routes";
import dashboard from "./dashboard.routes";

const routes = [];

for (let i = 0; i < authRoutes.length; i++) {
    routes.push(authRoutes[i]);
}
for (let i = 0; i < dashboard.length; i++) {
    routes.push(dashboard[i]);
}
export default routes;
