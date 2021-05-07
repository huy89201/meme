import api from './api'

const userService = {
    getUserById(userId){
        return api.get('/member/member.php',{
            params: {
                userid: userId
            }
        })
    }
}

export default userService;