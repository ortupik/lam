$(function(){
	
	$("#createCompanyForm").on("submit",function(E){
		E.preventDefault();

		var company_name = $("#company_name").val();
		var address1 = $("#address1").val();
		var company_no = $("#company_no").val();
		var address2 = $("#address2").val();
		var company_no2 = $("#company_no2").val();
		var address2x = $("#address2x").val();
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
			address1:address1,
			address2:address2,
			address2x:address2x,
			company_tier:company_tier,
			company_no:company_no,
			company_no2:company_no2,
			city:city,
			location_no:location_no,
			postcode:postcode,
			fname:fname,
			lname:lname,
			email:email,
			phone:phone
		}

		$.post("/create_company",data, function(res){
             if(res.success == 1){
             	alert("Success")
             }else{
             	alert("Failed")
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

		var data = {
			address1:address1,
			address2:address2,
			city:city,
			postcode:postcode,
			fname:fname,
			lname:lname,
			email:email,
			phone:phone
		}

		$.post("/create_user",data, function(res){
             if(res.success == 1){
             	alert("Success")
             }else{
             	alert("Failed")
             }
		});

	});

})