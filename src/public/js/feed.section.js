$(document).ready(function () {
    const feedList = $('#feedList');

    const fetchPublications = async () => {
        const response = await fetch('/api/publications');
        const publications = await response.json();
        feedList.empty();
        publications.forEach(pub => {
            feedList.append(`
                <div class="publication m-3 p-2 rounded-2 w-75 ${pub.isLiked ? 'liked' : ''}" data-id="${pub._id}">
                    <p>${pub.content}</p>
                    <button class="like-button ${pub.isLiked ? 'liked' : 'unliked'}">
                        <i class="fas fa-heart ${pub.isLiked ? 'liked' : ''}"></i>
                    </button>
                    <button class="delete-button">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `);
        });
    };

    $('#createPublication').on('click', async function (event) {
        event.preventDefault();
        const content = $('#message').val();
        if (!content) {
            toastr.error('Publication content cannot be empty');
            return;
        }

        const response = await fetch('/api/publications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            $('#message').val('');
            toastr.success('Publication created successfully!');
            fetchPublications();
        } else {
            toastr.error('Error creating publication');
        }
    });

    feedList.on('click', '.like-button', async function () {
        const publicationId = $(this).closest('.publication').data('id');
        const isLiked = $(this).find('.fa-heart').hasClass('liked');

        const response = await fetch(`/api/publications/${publicationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isLiked: !isLiked }),
        });

        if (response.ok) {
            const publicationElement = $(this).closest('.publication'); 
            if (isLiked) {
                $(this).removeClass('liked').addClass('unliked');
                $(this).find('.fa-heart').removeClass('liked').addClass('unliked');
                publicationElement.removeClass('liked'); 
                toastr.success('Publication unliked successfully!');
            } else {
                $(this).removeClass('unliked').addClass('liked');
                $(this).find('.fa-heart').removeClass('unliked').addClass('liked');
                publicationElement.addClass('liked'); 
                toastr.success('Publication liked successfully!');
            }
            fetchPublications();
        } else {
            toastr.error('Error updating like status');
        }
    });

    feedList.on('click', '.delete-button', async function () {
        const publicationId = $(this).closest('.publication').data('id');

        const response = await fetch(`/api/publications/${publicationId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            toastr.success('Publication deleted successfully!'); 
            fetchPublications(); 
        } else {
            toastr.error('Error deleting publication');
        }
    });

    fetchPublications();
});
