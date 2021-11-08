import React from 'react';

const Navbar = () => {

    const handleLogout = () => {
        window.localStorage.setItem("auth","");
        window.location.reload();
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Admin</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Data Analysis</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={handleLogout}>Log out</a>
                    </li>
                </ul>
                
            </div>
        </nav>
    );
}

export default Navbar;