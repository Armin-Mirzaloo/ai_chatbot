import bcrypt from "bcryptjs"

export const passwordHasher = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 11)

        return hashedPassword
    } 
    catch(err) {
        console.log(err)
        throw err
    }
}