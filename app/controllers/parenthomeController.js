controllers.myrvParentController = function ($scope, $http, $window, $route, $location, loginService) {
    function checkRole() {
        var role = loginService.getMemberRole();
        if (role == "admin")
        {
            $("#adminselect").show();
            $("#adminselectsmall").show();
        }
        else
        {
            $("#adminselect").hide();
            $("#adminselectsmall").hide();
        }  
    }

    function showPicture() {
        $('#homePicShowModalTitle').text("");
        $('#homePicShowModal').modal();
    }

    function getAvatar()
    {
        $scope.memberavatar = loginService.getMemberAvatar();
    }

    function getScreenName()
    {
        $scope.memberscreenname = loginService.getMemberScreenname();
    }

    function showAlert(title, body) {
        $('#parentAlertModalTitle').text(title);
        $('#parentAlertModalBody').text(body);
        $('#parentAlertModal').modal();
    }

    function loginlogoff(request) {
        var route = loginService.setLoginLogoffLabel("menubarlogin",1);
        getAvatar();
        loginService.setAvatarLabel("menubaravatar",1);

        checkRole();
        if (route != "")
        {
            $location.path(route);
        }

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
        {
            $("#loginHomeButton").text("Logoff");
        }
        else
        {
            $("#loginHomeButton").text("Login");
            if (route == '/home')
                showAlert("Success", "You are now logged off from MY RV");
        }
    }


    init();
    function init() {
        $scope.current = {};
        $scope.bigNavbar = true;

        var ua = getUserAgent();
        $scope.current.devicename = ua.deviceName; 
        $scope.current.devicetype = ua.deviceType;   

        $scope.mobileDevice = isMobile();

        setviewpadding();

        $(window).scroll(function() {  

            var windowCurrentPos = $(window).scrollTop();
            var viewTopPos = $('#myrv-view').offset().top;

            
            if (windowCurrentPos >= 100) 
            {
                $("#nav-bar-menu-bar-tall").hide();
                $("#nav-bar-menu-bar-short").show();
                
            } 
            else 
            {
                $("#nav-bar-menu-bar-short").hide();
                $("#nav-bar-menu-bar-tall").show();
            }
        });

        var windowHeight = window.innerHeight;

        getAvatar();
        getScreenName();

        loginService.setAvatarLabel("menubaravatar",0);
        var route = loginService.setLoginLogoffLabel("menubarlogin",0);

        checkRole();  
    };         

    $scope.loginlogoff = function (request) {
        loginlogoff(request);
    }

    // $scope.goMobile = function () {
    //     window.location.href = "mobile/index.html";
    // }

    $scope.showMemberAvatar = function () {
        getAvatar();
    }

    $scope.showAlert = function (title, body) {
        $('#parentAlertModalTitle').text(title);
        $('#parentAlertModalBody').text(body);
        $('#parentAlertModal').modal();
    }

    $scope.showPicture = function (picture) {
        showPicture(picture);   
    }
}

controllers.loginController = function ($scope, $http, $location, $window, loginService, loginFactory) {
    $scope.login = loginService.getEmptyLogin();
     
    init();
    function init() {
        //
        // this is not getting called at right time for definig top offset 
        // in jquery ready. So adding it here
        //
        $window.scrollTo(0, 0);

        setviewpadding();
        
    };

    $scope.sendLoginForm = function() {
        var data = "email="+$scope.login.email+"&password="+$scope.login.passwd;

        loginFactory.loginPassword(data)
            .success( function(login) {
                var ua = getUserAgent();
                
                if (login.rc == "1")
                {
                    loginService.addLogin(login);

                    // get avatar
                    $scope.$parent.showMemberAvatar();

                    // flip the label
                    var route = loginService.setLoginLogoffLabel("menubarlogin",0);
                    loginService.setAvatarLabel("menubaravatar",0);

                    if (ua.deviceType == "Mobile")
                    {
                        alert("Success\n"+login.text);

                        var role = loginService.getMemberRole();
                        if (role == "admin")
                        {
                            $("#adminselect").show();
                        }
                        else
                        {
                            $("#adminselect").hide();
                        }

                        $location.path("#home");
                    }
                    else
                    {
                        $('#iformationDialogModalTitle').text("Success");
                        $('#iformationDialogModalLabelBody').text(login.text);
                        $('#iformationDialogModal').modal();
                    }
                }
                else
                {
                    if (ua.deviceType == "Mobile")
                    {
                        alert("Error\n"+login.text);
                    }
                    else
                    {
                        $('#iformationDialogModalTitle').text("Error");
                        $('#iformationDialogModalLabelBody').text(login.text);
                        $('#iformationDialogModal').modal();
                    }
                }   
            })
            .error( function(edata) {
                if (ua.deviceType == "Mobile")
                {
                    alert("System Error\n"+edata);
                }
                else
                {
                    $('#iformationDialogModalTitle').text("System Error");
                    $('#iformationDialogModalLabelBody').text("Syetem Error", edata);
                    $('#iformationDialogModal').modal();
                }
            });
    }

    $scope.closeModalCleanUp = function () {
        var role = loginService.getMemberRole();
        if (role == "admin")
        {
            $("#adminselect").show();
            $("#adminselectsmall").show();
        }
        else
        {
            $("#adminselect").hide();
            $("#adminselectsmall").hide();
        }

        $('#iformationDialogModal').modal('hide');
        
        $location.path("/home");
    }
        
}

controllers.homeController = function ($scope, $http, $location, $window, $route, memberFactory, loginService) {

    function getMemberDashboardSnapshot() {
        getMemberInfo();

        var qdata = 'memberid='+$scope.current.memberid;
        memberFactory.getMemberDashboardSnapshot(qdata)
            .success( function(data) {
                $scope.current.snapshot = data;
                })
            .error( function(edata) {
                alert(edata);
            }); 
    }

    function getMemberInfo() {
        $scope.current.memberlogin = loginService.getLogin();
        $scope.current.memberid = $scope.current.memberlogin.memberid;
        $scope.current.membername = $scope.current.memberlogin.membername;
    }

    init();
    function init() {
        $scope.current = {};
        $scope.current.snapshot = {};
        $scope.loggedin = false;

        //
        // this is not getting called at right time for definig top offset 
        // in jquery ready. So adding it here
        //
        $window.scrollTo(0, 0);

        setviewpadding();

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
        {
            $scope.loggedin = true;

            $("#loginHomeButton").text("Logoff");

            getMemberDashboardSnapshot();
        }
        else
        {
            $scope.loggedin = false;
            
            $("#loginHomeButton").text("Login");
        }
    };

    $scope.homepagelogin = function () {
        $scope.$parent.loginlogoff();

        var loggedIn = loginService.isLoggedIn();
        if (loggedIn)
        {
            $("#loginHomeButton").text("Logoff");
        }
        else
        {
            $("#loginHomeButton").text("Login");
        }

        $route.reload();
    }
}