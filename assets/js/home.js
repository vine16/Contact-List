$(document).ready(function() {

    const form = $('#new-contact-form');
    const itemsContainer = $('#contact_list_container');
    console.log('hello');
    console.log(form);
    form.submit(function(event)
    {
        event.preventDefault();
        console.log(form.serialize());//name=khusbhoo&number=9999999999
        $.ajax({
            type: "GET",
            url: "/create-contact",  // Endpoint on the Express.js backend
            data: form.serialize(),
            success: function(data) {

                console.log('aaa', data);
                const newContact = createDOMContact(data.data.contactId, data.data.name, data.data.phone);
                // Update the content with received data
                itemsContainer.append(newContact);
            },
            error: function(err) {
                console.error("Error:", err);
            }
        });
        // var formData = $(this).serializeArray();
        // const newContact = createDOMContact();
        // console.log(formData);

    });


    function createDOMContact(id, name, phone)
    {
        const item = `<li>
            <div class="contact">
                <p>${name}</p>
                <p>${phone}</p>
            </div>
            <div class="dlt-btn">
            <a href="/delete-contact/?id=${id}">
                    <i class="fa-solid fa-trash-can"></i>
                </a>
            </div>
        </li>`

        return item;
    }
});