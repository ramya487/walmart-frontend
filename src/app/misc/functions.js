const toSnakeCase = (str) => {
    return str
        .trim() // Remove leading and trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/[\s\W-]+/g, '_'); // Replace spaces, non-word characters, and hyphens with an underscore
}

export default toSnakeCase;