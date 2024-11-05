const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
    isLiked: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const Publication = mongoose.model('Publication', publicationSchema);

const createPublication = async (content) => {
    const publication = new Publication({ content });
    await publication.save();
    return publication;
};

const readPublications = async () => {
    return await Publication.find({});
};

const updatePublication = async (id, isLiked) => {
    return await Publication.findByIdAndUpdate(id, { isLiked }, { new: true });
};

const deletePublication = async (id) => {
    return await Publication.findByIdAndDelete(id);
};

module.exports = {
    Publication,
    createPublication,
    readPublications,
    updatePublication,
    deletePublication,
};
