 /**
  * FOR CONTACT AJAX
  */
//  $(function () {
//      $('#form').submit(function (event) {
//          event.preventDefault();
//          var form = $(this);
//          $.ajax({
//              type: form.attr('method'),
//              url: form.attr('action'),
//              data: form.serialize(),
//              // dataType: 'json',
//              success: function (response) {
//                  let parsedResponse = JSON.parse(response);
//                  if (parsedResponse['redirect'] !== undefined) {
//                      window.location.href = parsedResponse['redirect'];
//                  }
//                  if (parsedResponse['field_error'] !== undefined) {
//                      let existing_error_message = document.querySelectorAll('.error');
//                      if (existing_error_message.length > 0) {
//                          existing_error_message.forEach(item => {
//                              item.remove();
//                          });
//                      }
//                      $.each(parsedResponse['field_error'], function (key, value) {
//                          let error_element = document.querySelector(`#${key}`);
//                          let error_message = document.createElement('p');
//                          error_message.className = 'error';
//                          $.each(value, function (rule, result) {
//                              error_message.innerText = result.message;
//                          });
//                          error_element.parentElement.appendChild(error_message);
//                      });
//                  }
//              },
//          });
//      });
//  });