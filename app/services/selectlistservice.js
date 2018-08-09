myrvApp.service('selectListService', function () {

    this.getList = function(listName) {
        var thisList = emptyList;

        switch (listName) 
        {
            case 'emt':
                thisList = emtList;
                break;

           case 'states':
                thisList = stateList;
                break;

           case 'memberstatus':
                thisList = memberstatusList;
                break; 

           case 'vehiclestatus':
                thisList = vehiclestatusList;
                break; 

           case 'vehicletypes':
                thisList = vehicletypesList;
                break;           

           case 'memberroles':
                thisList = memberroleList;
                break; 

           case 'membergenders':
                thisList = membergenderList;
                break;           
                         
        }

        return thisList;
    }

    var emptyList = [
        {   }
    ];

    var emtList = [ 
        { title :  "Welcome", url : "welcome-email.html", type : "normal", recipients : "manual" },
        { title :  "New Avatar", url : "avatar-change-email.html", type : "normal", recipients : "manual" },
        { title :  "New Avatar and Login", url : "avatar-login-change-email.html", type : "normal", recipients : "manual" },
        { title :  "New Login", url : "login-change-email.html", type : "normal", recipients : "manual" },
        { title :  "New Season", url : "welcome-new-season-email.html", type : "normal", recipients : "all" },
        { title :  "Season Wrap Up", url : "end-of-season-email.html", type : "normal", recipients : "all" },
        { title :  "Game week", url : "gameweek", type : "dynamic", recipients : "all" },
        { title :  "Team Weekly Rankings", url : "teamweeklyrankings-email.html", type : "normal", recipients : "all" },
        { title :  "Late Picks", url : "latepicks-email.html", type : "normal", recipients : "latepicks" }, 
        { title :  "Late Picks Day Of", url : "latepicksdayof-email.html", type : "normal", recipients : "latepicksdayof" }, 
        { title :  "Late Picks Day Before", url : "latepicksdaybefore-email.html", type : "normal", recipients : "latepicksdaybefore" }, 
        { title :  "Ooops Moment", url : "oops-email.html", type : "normal", recipients : "all" }, 
        { title :  "Site Problems", url : "siteproblems-email.html", type : "normal", recipients : "all" },  
        { title :  "Site Down", url : "sitedown-email.html", type : "normal", recipients : "all" }
    ];

    var memberstatusList = [ 
        { title :  "active", value : "active" },
        { title :  "inactive", value : "inactive" }
    ];

    var memberroleList = [ 
        { title :  "member", value : "member" },
        { title :  "admin", value : "admin" },
        { title :  "expert", value : "expert" }
    ];

    var vehiclestatusList = [ 
        { title :  "active", value : "active" },
        { title :  "inactive", value : "inactive" },
        { title :  "other", value : "other" }
    ];

    var vehicletypesList = [ 
        { title :  "RV", value : "RV" },
        { title :  "Truck", value : "Truck" }
    ];

    var membergenderList = [ 
        { title :  "Male", value : "Male" },
        { title :  "Female", value : "Female" },
        { title :  "Other", value : "Other" }
    ];

    var stateList = [ 
        { value : "AL", title : "Alabama" },
        { value : "AK", title : "Alaskan" },
        { value : "AZ", title : "Arizona" },
        { value : "AR", title : "Arkansas" },
        { value : "CA", title : "California" },
        { value : "CO", title : "Colorado" },
        { value : "CT", title : "Connecticut" },
        { value : "DE", title : "Delaware" },
        { value : "DC", title : "District of Columbia" },
        { value : "FL", title : "Florida" },
        { value : "GA", title : "Georgia" },
        { value : "HI", title : "Hawaiin" },
        { value : "ID", title : "Idaho" },
        { value : "IL", title : "Illinois" },
        { value : "IN", title : "Indiana" },
        { value : "IA", title : "Iowa" },
        { value : "KS", title : "Kansas" },
        { value : "KY", title : "Kentucky" },
        { value : "LA", title : "Louisiana" },
        { value : "ME", title : "Maine" },
        { value : "MD", title : "Maryland" },
        { value : "MA", title : "Massachusetts" },
        { value : "MI", title : "Michigan" },
        { value : "MN", title : "Minnesota" },
        { value : "MS", title : "Mississippi" },
        { value : "MO", title : "Missouri" },
        { value : "MT", title : "Montana" },
        { value : "NE", title : "Nebraska" },
        { value : "NV", title : "Nevada" },
        { value : "NH", title : "New Hampshire" },
        { value : "NJ", title : "New Jersey" },
        { value : "NM", title : "New Mexico" },
        { value : "NY", title : "New York" },
        { value : "NC", title : "North Carolina" },
        { value : "ND", title : "North Dakota" },
        { value : "OH", title : "Ohio" },
        { value : "OK", title : "Oklahoma" },
        { value : "OR", title : "Oregon" },
        { value : "PA", title : "Pennsylvania" },
        { value : "RI", title : "Rhode Island" },
        { value : "SC", title : "South Carolina" },
        { value : "SD", title : "South Dakota" },
        { value : "TN", title : "Tennessee" },
        { value : "TX", title : "Texas" },
        { value : "UT", title : "Utah" },
        { value : "VT", title : "Vermont" },
        { value : "VA", title : "Virginia" },
        { value : "WA", title : "Washington" },
        { value : "WV", title : "West Virginia" },
        { value : "WI", title : "Wisconsin" },
        { value : "WY", title : "Wyoming" }
    ];

});