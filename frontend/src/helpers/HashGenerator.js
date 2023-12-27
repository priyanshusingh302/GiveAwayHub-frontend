import bcrypt from 'bcryptjs'

const salt = '$2a$10$CwTycUXWue0Thq9StjUM0u';

export function hash(password) {

    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;

}