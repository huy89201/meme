import postsService from '../service/postsService'

export const ACT_GET_NEWS_POST = 'ACT_GET_NEWS_POST'
export const ACT_GET_NEWS_POST_BY_CATEGORY = 'ACT_GET_NEWS_POST_BY_CATEGORY'

export function getNewPosts(posts){
    return {
        type: ACT_GET_NEWS_POST,
        payload: posts
    }
}

export function getNewPostsAsync(){
    return async (dispatch) => {
        try {
            const rest = await postsService.getNewPosts();
            const data = rest.data.posts;
            // console.log(rest)
            dispatch(getNewPosts(data));
        } catch (error) {
            console.log(error);
        }

    }
}

export function getNewPostsByCategory(posts){
    return {
        type: ACT_GET_NEWS_POST_BY_CATEGORY,
        payload: posts
    }
}

export function getNewPostsByCategoryAsync(tagIndex){
    return async (dispatch) => {
        try {
            const rest = await postsService.getNewPostsByCategory({tagIndex});
            const data = rest.data.posts;

            dispatch(getNewPostsByCategory(data));
        } catch (error) {
            console.log(error);
        }

    }
}