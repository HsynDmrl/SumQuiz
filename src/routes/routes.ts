import { RoleController } from "../controller/RoleController"
import { UserController } from "../controller/UserController"

export const Routes = [{
    method: "get",
    route: "/users/getAll",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users/add",
    controller: UserController,
    action: "save"
}, {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/roles/getAll",
    controller: RoleController,
    action: "all"
}, {
    method: "get",
    route: "/roles/:id",
    controller: RoleController,
    action: "one"
}, {
    method: "post",
    route: "/roles/add",
    controller: RoleController,
    action: "save"
}, {
    method: "put",
    route: "/roles/:id",
    controller: RoleController,
    action: "update"
}, {
    method: "delete",
    route: "/roles/:id",
    controller: RoleController,
    action: "remove"
}]