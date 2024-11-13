import jws from 'jsonwebtoken';

const generateToken = (id) => {
    const token = jws.sign({id}, process.env.JWT_KEY, {expiresIn: "3d"});
    return token;
};

export default generateToken;