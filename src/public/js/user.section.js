//User photo fetch
$(document).ready(function () {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        $('#profilePhoto').attr('src', savedPhoto);
    }

    $('#fileInput').on('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type === 'image/webp') {
            const reader = new FileReader();
            reader.onload = function (event) {
                localStorage.setItem(
                    'profilePhoto',
                    event.target.result
                );
                $('#profilePhoto').attr('src', event.target.result);
                toastr.success(
                    'Profile photo uploaded successfully!',
                    'Success'
                );
            };
            reader.readAsDataURL(file);
        } else {
            toastr.error(
                'Please upload a valid .webp image file.',
                'Error'
            );
        }
    });
});

// User profile info section
$(document).ready(function () {
    if (localStorage.getItem('userInfo')) {
        const userInfo = JSON.parse(
            localStorage.getItem('userInfo')
        );
        $('#firstName').val(userInfo.firstName);
        $('#lastName').val(userInfo.lastName);
        $('#age').val(userInfo.age);
        $('#email').val(userInfo.email);
    }

    function saveUserInfo(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    function saveFirstName() {
        const firstName = $('#firstName').val();
        if (firstName) {
            const userInfo =
                JSON.parse(localStorage.getItem('userInfo')) || {};
            userInfo.firstName = firstName;
            saveUserInfo(userInfo);
            toastr.success(
                'First Name saved successfully!',
                'Success'
            );
        } else {
            toastr.error(
                'Please enter a valid First Name.',
                'Error'
            );
        }
    }

    function saveLastName() {
        const lastName = $('#lastName').val();
        if (lastName) {
            const userInfo =
                JSON.parse(localStorage.getItem('userInfo')) || {};
            userInfo.lastName = lastName;
            saveUserInfo(userInfo);
            toastr.success(
                'Last Name saved successfully!',
                'Success'
            );
        } else {
            toastr.error(
                'Please enter a valid Last Name.',
                'Error'
            );
        }
    }

    function saveAge() {
        const age = $('#age').val();
        if (age) {
            const userInfo =
                JSON.parse(localStorage.getItem('userInfo')) || {};
            userInfo.age = age;
            saveUserInfo(userInfo);
            toastr.success('Age saved successfully!', 'Success');
        } else {
            toastr.error('Please enter a valid Age.', 'Error');
        }
    }

    function saveEmail() {
        const email = $('#email').val();
        if (email) {
            const userInfo =
                JSON.parse(localStorage.getItem('userInfo')) || {};
            userInfo.email = email;
            saveUserInfo(userInfo);
            toastr.success('Email saved successfully!', 'Success');
        } else {
            toastr.error('Please enter a valid Email.', 'Error');
        }
    }

    function clearInputFields() {
        $('#firstName').val('');
        $('#lastName').val('');
        $('#age').val('');
        $('#email').val('');
    }

    $('#firstName').on('blur', saveFirstName);
    $('#lastName').on('blur', saveLastName);
    $('#age').on('blur', saveAge);
    $('#email').on('blur', saveEmail);


    //Chuck joke section
    $.get('/api-url', function (data) {
        function fetchJoke() {
            $.ajax({
                url: data.apiUrl,
                method: 'GET',
                success: function (data) {
                    $('#jokeContainer').text(data.value).show();
                },
                error: function () {
                    toastr.error(
                        'Failed to fetch a joke.',
                        'Error'
                    );
                },
            });
        }

        fetchJoke();

        const clearCache = () => {
            localStorage.clear();
            clearInputFields();
            location.reload();
            toastr.success('Cache cleared successfully!');
        };
    
        $('#clearCache').on('click', clearCache);

        $('#fetchJoke').on('click', fetchJoke);
    });
});

