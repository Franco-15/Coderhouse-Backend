class DTOUSer {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.cartId = user.cartId;
    }

    getUser() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            role: this.role,
            cartId: this.cartId,
        };
    }
}

export default DTOUSer;