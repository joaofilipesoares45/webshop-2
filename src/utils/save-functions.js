const localS = (ref, type, key, value, data) => {
    const base = JSON.parse(localStorage.getItem(`webshop-2:${ref}`))

    if (type) {
        // "push"
        if (base === null) {
            localStorage.setItem(`webshop-2:${ref}`, JSON.stringify([data]))
        } else {
            base.push(data)
            localStorage.setItem(`webshop-2:${ref}`, JSON.stringify(base))
        }
    } else {
        // "delete"
        const newData = base.filter((item) => item[key] !== value)
        localStorage.setItem(`webshop-2:${ref}`, JSON.stringify(newData))
    }

    return(JSON.parse(localStorage.getItem(`webshop-2:${ref}`)))
}

export const saveData = (base, ref, type, key, value, data) => {
    if (base === "local-s") {
        return(localS(ref, type, key, value, data))
    }
}