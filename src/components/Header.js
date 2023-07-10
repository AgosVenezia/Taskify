import { Navbar, Dropdown, Avatar } from "flowbite-react";

function Header() {

    return (
        <Navbar
            className="shadow-md"
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                <img
                src="img/logorectangular.png"
                className="mr-3 h-6 sm:h-9"
                alt="Logo"
                />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img="https://static.wikia.nocookie.net/succession/images/d/da/Roman_Roy.png" rounded={true}/>}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            Romulus Roy
                        </span>
                        <span className="block truncate text-sm font-medium">
                            discordmakesmy@waystar.org
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Earnings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/navbars" active={true} >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;
