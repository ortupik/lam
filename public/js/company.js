$(function(){

     
      $.post("/company/getCompanyStats", function(resp){
         if(resp.success == 1){
           var data = resp.data;
           var numCo = data.num_co;
           $("#num_co").text(numCo);
         }
      });

    

      $.post("/users/getUsersStats", function(resp){
         if(resp.success == 1){
           var data = resp.data;
           var numUsers = data.num_users;
           $("#num_users").text(numUsers);
         }
      });

      $.get("/company/getCompanyNameList", function(resp){
         if(resp.success == 1){
           var data = resp.data;            

           for(var i = 0; i < data.length; i++){

              var company = data[i];
              var id = company.id;
              var name = company.name;
              $("#u_company").append("<option value='"+id+"' >"+name+"</option>");
              $("#s_company").append("<option value='"+id+"'>"+name+"</option>"); 
              if(i == 0){
                displayCompanyInfoStats(id);
              }
           }
           
         }
      });

      $("#s_company").on('change', function(e){
         var company_id = $(this).val();
         displayCompanyInfoStats(company_id)
      });

       function displayCompanyInfoStats(company_id){
          $.post("/stats/getCompanyInfoStats",{company_id:company_id}, function(resp2){
             if(resp2.success == 1){
               var data = resp2.data;
               var noa = data.noa;
               var company_tier = data.company_tier;
               var noe = data.noe;
               var nom = data.nom;
               $("#noa_d").text(noa);
               $("#company_tier_d").text(company_tier);
               $("#noe_d").text(noe);
               $("#nom_d").text(nom);
             }
          });

           $.post("/users/getCompanyUsers",{company_id:company_id}, function(resp){

             if(resp.success == 1){
               var data = resp.data;

               $("#manager_list").empty();
               $("#admin_list").empty();
               $("#employee_list").empty();

               for(var i = 0; i < data.length; i++){
                  var company = data[i];
                  displayCompanyUsers(company);
               }
               
             }
          });

       }

     function displayCompanyUsers(company){
 
         var id = company.id;
         var name = company.fname+" "+company.lname;
         var raw_role = $.trim(company.role);
         var location = company.location;
         var email = company.email;
         var phone = company.phone;
         var address = company.address1;

         var role = "N/A";
         if(raw_role == "1"){
            role = "Super Admin";
         }else if(raw_role == "2"){
           role = "Company Admin";
         }else if(raw_role == "3" ){
            role = "Company Manager";
         }else if(raw_role == "4" ){
            role = "Company Auditor";
         }else if(raw_role == "5" ){
            role = "Company Manager (Employee)";
         }else if(raw_role == "6"){
            role = "Employee";
         }

         var content_div = '<div class="col-md-3 col-xs-12 widget ">'+
                  '<div class="x_panel ">'+
                    '<div class="x_content company">'+
                     '<img src="images/user.png" alt="..." class="img-circle user_img">'+
                      '<div class="name">'+name+'</div>'+
                      '<div class="role">'+role+'</div>'+
                      '<div class="line"></div>'+
                      '<div class="">'+
                       '<div class="contact"> <i class="fa fa-phone"></i><span>'+phone+'</span> </div>'+
                        '<div class="contact"> <i class="fa fa-envelope"></i><span>'+email+'</span> </div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';

         if(raw_role == "1" || raw_role == "2"){
            $("#admin_list").append($(content_div));
         }else if(raw_role == "3" || raw_role == "4" || raw_role  == "5"){
            $("#manager_list").append($(content_div));
         }else if(raw_role == "6"){
            var employee_div =  '<div class="col-md-3 col-xs-12 widget ">'+
                                '<div class="x_panel ">'+
                                  '<div class="x_content company">'+
                                   '<img src="images/user.png" alt="..." class="img-circle user_img">'+
                                    '<div class="name">'+name+'</div>'+
                                    '<div class="role">'+role+'</div>'+
                                    '<div class="location">'+location+'</div>'+
                                    '<div class="line"></div>'+
                                    '<div class="">'+
                                      '<div class="contact"> <i class="fa fa-phone"></i><span>'+phone+'</span> </div>'+
                                      '<div class="contact"> <i class="fa fa-envelope"></i><span>'+email+'</span> </div>'+
                                      '<div class="contact"> <i class="fa fa-map-marker"></i><span>'+address+'</span> </div>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>'+
                              '</div>';
            $("#employee_list").append($(employee_div));
         }

     }

      $("#createCompanyForm").on("submit",function(E){

    E.preventDefault();

    var company_name = $("#company_name").val();
    var address1 = $("#address").val();
    var company_no = $("#company_no").val();
    var address2 = $("#address2").val();
    var company_no2 = $("#company_no2").val();
    var company_tier = $("#company_tier").val();
    var city = $("#city").val();
    var location_no = $("#location_no").val();
    var postcode = $("#postcode").val();
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();


    var data = {
      company_name:company_name,
      address:address1,
      address2:address2,
      tier:company_tier,
      company_no:company_no,
      city:city,
      location_no:location_no,
      postcode:postcode,
      fname:fname,
      lname:lname,
      email:email,
      phone:phone
    }

    $.post("/company/create_company",data, function(res){
       if(res.success == 1){
           Swal.fire({
                type: 'success',
                title: 'Success',
                text: "Successfully Created Company !",
              }).then((result) => {
                window.location.href = window.location.href;
              })
         }else{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: res.message,
          });
         }
    });

  });

$("#addUserForm").on("submit",function(E){

    E.preventDefault();

    var address1 = $("#u_address1").val();
    var address2 = $("#u_address2").val();
    var city = $("#u_city").val();
    var postcode = $("u_#postcode").val();
    var fname = $("#u_fname").val();
    var lname = $("#u_lname").val();
    var email = $("#u_email").val();
    var phone = $("#u_phone").val();
    var company_id = $("#u_company").val();
    var location = $("#u_location").val();
    var role = $("#u_role").val();
    var company = $('#u_company').find('option:selected').text();

    var data = {
      company:company,
      address1:address1,
      address2:address2,
      city:city,
      postcode:postcode,
      fname:fname,
      lname:lname,
      email:email,
      phone:phone,
      company_id:company_id,
      location:location,
      role:role
    }


    $.post("/users/create_user",data, function(res){
       if(res.success == 1){
         Swal.fire({
          type: 'success',
          title: 'Success',
          text: "User has been Created, email invitation sent !",
         }).then((result) => {
            window.location.href = window.location.href;
          })
       }else{
         Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: res.message,
          }).then((result) => {
          })
       }
    });

  });
 });