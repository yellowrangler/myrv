//
// validate shipping form
//
function validateLoginForm()
{
	var err = "";

	err = simpleNumberValidation($("#walletsize"),$("#alert_msg"), "Please select size", 1);
	if (err) return err;

	err = simpleNumberValidation($("#walletqty"),$("#alert_msg"), "Please select quantity", 1);
	if (err) return err;

	return 0;
}

function selectFieldBadValue(selectFieldValue) {
	var pos = 0;
	var rval = 0;

	$pos = selectFieldValue.indexOf("undefined");
	if ($pos !== -1)
	{
		rval = 1;
	}
	
	$pos = selectFieldValue.indexOf("null");
	if ($pos !== -1)
	{
		rval = 1;
	}

	$pos = selectFieldValue.indexOf("?");
	if ($pos !== -1)
	{
		rval = 1;
	}
	
	return rval;
}


function isValidDate(d) {
	var retvalue = false;

	if (d == "" || d == undefined)
	{
		return true;
	}

	var dateArray = d.split("/");

	if (dateArray.length == 3)
	{
		if (dateArray[0] > 0 && dateArray[0] < 13)
		{
			if (dateArray[1] > 0 && dateArray[1] < 32)
			{
				if (dateArray[2] > 1900 && dateArray[2].length == 4)
				{
					var retvalue = true;
				}
			}
		}
	}
	
  	return retvalue;
}

function isValidTime(t) {
	var retvalue = true;


  	return retvalue;
}

function isEmptyField(varStaring) {
	var retvalue = false;

	if ($.trim(varStaring) == "" || varStaring == undefined)
	{
		retvalue = true;
	}

  	return retvalue;
}

function itemOccurancesInString(str, item) {
	 // Declare variables
	var pos = 0;
	var num = -1;
	var i = -1;

	// Search the string and counts the number of e's
	while (pos != -1) {
		pos = str.indexOf(item, i + 1);
		num += 1;
		i = pos;
	}

	return num;
}

function odometerRealtimeValidation(e)
{
	var err = "";
	var nbr = 0;
	var testString = "";

	testString = e.currentTarget.value +  e.key;
	nbr = itemOccurancesInString(testString, ".")
	if (nbr > 1)
    {
    	e.preventDefault();
        return false;
    }

    if ( (e.keyCode < 47 || e.keyCode > 57) && ( e.key != '.') )
    {
        e.preventDefault();
        return false;
    }

    if (e.currentTarget.value.length > 8 )
    {
        e.currentTarget.value = "";
        e.preventDefault();

        return false;
    }

	return 0;
}

function dollarRealtimeValidation(e)
{
	var err = "";
	var nbr = 0;
	var testString = "";

	testString = e.currentTarget.value +  e.key;
	nbr = itemOccurancesInString(testString, ".")
	if (nbr > 1)
    {
    	e.preventDefault();
        return false;
    }

    if ( (e.keyCode < 47 || e.keyCode > 57) && ( e.key != '.') )
    {
        e.preventDefault();
        return false;
    }

    if (e.currentTarget.value.length > 20 )
    {
        e.currentTarget.value = "";
        e.preventDefault();

        return false;
    }

	return 0;
}

function gallonsRealtimeValidation(e)
{
	var err = "";
	var nbr = 0;
	var testString = "";

	testString = e.currentTarget.value +  e.key;
	nbr = itemOccurancesInString(testString, ".")
	if (nbr > 1)
    {
    	e.preventDefault();
        return false;
    }

    if ( (e.keyCode < 47 || e.keyCode > 57) && ( e.key != '.') )
    {
        e.preventDefault();
        return false;
    }

    if (e.currentTarget.value.length > 20 )
    {
        e.currentTarget.value = "";
        e.preventDefault();

        return false;
    }

	return 0;
}

function milesRealtimeValidation(e)
{
	var err = "";
	var nbr = 0;
	var testString = "";

	testString = e.currentTarget.value +  e.key;
	nbr = itemOccurancesInString(testString, ".")
	if (nbr > 1)
    {
    	e.preventDefault();
        return false;
    }

    if ( (e.keyCode < 47 || e.keyCode > 57) && ( e.key != '.') )
    {
        e.preventDefault();
        return false;
    }

    if (e.currentTarget.value.length > 20 )
    {
        e.currentTarget.value = "";
        e.preventDefault();

        return false;
    }

	return 0;
}

function positiveDecimalPostValidation(valString)
{
	var testNbr = 0;
	var nbr = 0;

	if (valString == "" || valString == undefined)
	{
		return true;
	}

	nbr = itemOccurancesInString(valString, ".")
	if (nbr > 1)
    {
        return false;
    }

    if (isNaN(valString))
    {
    	return false;
    }

    testNbr = valString * 1;
    if ( testNbr < 0 )
    {
        return false;
    }

	return true;
}

function simpleValidation(obj,alert,msg,lth_min,lth_max)
{
	var test = obj.val();

	if (test.length < lth_min || test.length > lth_max )
	{
		$(alert).html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+msg+'</span></div>');
		obj.focus();
		var t=setTimeout(function(){closeAlert(alert)},3000);

		return 1;
	}

	return 0;
}

function simpleNumberValidation(obj,alert,msg,smallnbr)
{
	var test = obj.val();

	if (isNaN(test))
	{
		$(alert).html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+msg+'</span></div>')
		obj.focus();
		var t=setTimeout(function(){closeAlert(alert)},3000);

		return 1;
	}

	if (test < smallnbr)
	{
		$(alert).html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+msg+'</span></div>')
		obj.focus();
		var t=setTimeout(function(){closeAlert(alert)},3000);

		return 1;
	}

	return 0;
}

function simplePhoneValidation(obj,alert,msg)
{
	var test = obj.val();
	var err = 0;

	if (isNaN(test))
	{
		//
		// if not all number must have dashes
		//
		if (test.length != 12)
		{
			err = 1;
		}

		for (var i = 0; i < test.length; i++)
		{
			switch(i)
			{
				case 0:
				case 1:
				case 2:
				case 4:
				case 5:
				case 6:
				case 8:
				case 9:
				case 10:
				case 11:
					if (isNaN(test[i]) )
					{
						err = 1;
					}
					break;

				case 3:
				case 7:
					if (test[i] != "-")
					{
						err = 1;
					}
				break;	
			}

		}
	}
	else
	{
		if (test.length != 10)
		{
			err = 1;
		}
		else
		{
			var formattedStr = test.slice(0,3)+"-"+test.slice(3,6)+"-"+test.slice(6);
			obj.val(formattedStr);
			var t=setTimeout(function(){closeAlert(alert)},3000);
		}
	}

	if (err)
	{
		$(alert).html('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a><span>'+msg+'</span></div>')
		obj.focus();
		var t=setTimeout(function(){closeAlert(alert)},3000);

		return 1;
	}

	return 0;
}

//
// utility scripts
//
function closeAlert(alert)
{
	$(alert).html('');
	// $(alert).alert('close');
}