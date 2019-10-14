const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const { randomBytes } = require('crypto');
const { transport, craftEmail } = require('../mail');
const { prisma } = require('../prisma');

function deleteUser(id) {

    return prisma.deleteUser({ id })
}

async function requestReset(email) {
    const user = await prisma.user({ email });

    if (!user) {
        throw new Error(`No user found for email ${email}.`);
    }

    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

    const result = await prisma.updateUser({
        where: { email },
        data: { resetToken, resetTokenExpiration }
    });

    const mailRes = await transport.sendMail({
        from: 'admin@admin.admin',
        to: user.email,
        subject: 'Password Reset Link',
        html: craftEmail(`
            Your password reset link is here!\n
            \n
            <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>
        `)
    });

    return { message: "success!" };
}

async function resetPassword(args) {
    if (args.password != args.confirmPassword) {
        throw new Error('Passwords do not match!');
    }

    const [user] = await prisma.users({
        where: {
            resetToken: args.resetToken,
            resetTokenExpiration_gte: Date.now() - 3600000
        }
    });
    if (!user) {
        throw new Error('This token is invalid or expired!');
    }
    
    const password = await bcrypt.hash(args.password, 10);

    return prisma.updateUser({
        where: { email: user.email },
        data: {
            password,
            resetToken: null,
            resetTokenExpiration: null
        }
    });
}

async function signup(args) {
    return prisma.createUser(args);
};

function updatePermissions(id, permissions) {
    
    return prisma.updateUser({
        where: { id },
        data: {
            permissions: {
                set: permissions
            }
        }
    });
};

function updateUser(id, updates) {
    
    return prisma.updateUser({ where: { id }, data: updates });
}

module.exports = {
    deleteUser,
    requestReset,
    resetPassword,
    signup,
    updatePermissions,
    updateUser
};
