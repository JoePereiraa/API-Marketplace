interface User {
    id?:         string;
    name:        string;
    email:       string;
    password:    string;
    accessName?: string;
    created_at?: Date;
    updated_at?: Date;
}

export { User }