import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var UserSearchPipe = /** @class */ (function () {
    function UserSearchPipe() {
    }
    UserSearchPipe.prototype.transform = function (users, searchText) {
        if (searchText == null) {
            return users;
        }
        return users.filter(function (user) {
            return user.firstName + ' ' + user.lastName;
        });
    };
    UserSearchPipe = tslib_1.__decorate([
        Pipe({
            name: 'userSearch'
        })
    ], UserSearchPipe);
    return UserSearchPipe;
}());
export { UserSearchPipe };
//# sourceMappingURL=user-search-pipe.js.map