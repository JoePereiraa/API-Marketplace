interface Store {
    id?:         string;
    name:        string;
    userId?:     string | null;
    user?:       Object
    created_at?: Date;
    updated_at?: Date;
}

export { Store }