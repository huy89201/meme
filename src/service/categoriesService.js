import api from './api'

export const categoriesService = {
    getCategories(){
        return api.get('/categories/index.php');
    }
}

export default categoriesService;   