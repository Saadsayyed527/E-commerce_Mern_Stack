import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try {
        const saltRound =10;
        const hashedPass =await bcrypt.hash(password,saltRound);
        return hashedPass ;
    } catch (error) {
       console.log(error) ;
    }
};

export const compairePassword = async (password,hashPassword)=>{
    return  bcrypt.compare(password,hashPassword);
}