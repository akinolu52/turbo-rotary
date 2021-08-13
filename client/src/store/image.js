const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const UPLOADED_COUNT = "UPLOADED_COUNT";
const TOTAL_IMAGE_COUNT = "TOTAL_IMAGE_COUNT";
const CLEAR_IMAGE = "CLEAR_IMAGE";

const INITIAL_STATE = {
    uploadedCount: 0,
    imagesUrl: [],
    totalImageCount: 0,
    complete: false,
};

export const setImageUrls = (imagesUrl) => {
    return {
        type: UPLOAD_IMAGE,
        complete: true,
        imagesUrl
    };
};

export const setUploadedCount = (uploadedCount) => {
    return {
        type: UPLOADED_COUNT,
        uploadedCount
    };
};

export const setTotalImageCount = (totalImageCount) => {
    return {
        type: TOTAL_IMAGE_COUNT,
        totalImageCount
    };
};

export const clearImageUrls = () => {
    return {
        type: CLEAR_IMAGE,
    };
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case UPLOAD_IMAGE: {
            return {
                ...state,
                imagesUrl: action.imagesUrl,
                complete: action.complete
            };
        }
        case UPLOADED_COUNT: {
            return { ...state, uploadedCount: action.uploadedCount };
        }
        case TOTAL_IMAGE_COUNT: {
            return { ...state, totalImageCount: action.totalImageCount };
        }
        case CLEAR_IMAGE: {
            return { ...state, ...INITIAL_STATE }
        }
        default:
            return state;
    }
};

export default reducer;
