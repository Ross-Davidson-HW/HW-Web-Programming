<?php # LOGIN HELPER FUNCTIONS.

# Function to load specified or default URL.
function load( $page = 'login.php' )
{
  # Begin URL with protocol, domain, and current directory.
  $url = 'http://' . $_SERVER[ 'HTTP_HOST' ] . dirname( $_SERVER[ 'PHP_SELF' ] ) ;

  # Remove trailing slashes then append page name to URL.
  $url = rtrim( $url, '/\\' ) ;
  $url .= '/' . $page ;

  # Execute redirect then quit. 
  header( "Location: $url" ) ; 
  exit() ;
}

# Function to check email address and password. 
function validate( $link, $usrnme = '', $pwd = '')
{
  # Initialize errors array.
  $errors = array() ; 

  # Check email field.
  if ( empty( $usrnme ) ) 
  { $errors[] = 'Enter your Username.' ; } 
  else  { $usrnme = mysqli_real_escape_string( $link, trim( $usrnme ) ) ; }

  # Check password field.
  if ( empty( $pwd ) ) 
  { $errors[] = 'Enter your password.' ; } 
  else { $p = mysqli_real_escape_string( $link, trim( $pwd ) ) ; }

  # On success retrieve id, name, usertype, subscriber, subexpires from 'users' database.
  if ( empty( $errors ) ) 
  {
    $q = "SELECT id, username FROM users WHERE username='$usrnme' AND pass=SHA1('$p')" ;  
    $r = mysqli_query ( $link, $q ) ;
	
	#If the entered information matches
    if ( @mysqli_num_rows( $r ) == 1 ) 
    {
      $row = mysqli_fetch_array ( $r, MYSQLI_ASSOC ) ;
      return array( true, $row ) ; 
    }
    # Or on failure set error message.
    else { $errors[] = 'Username and password not found.' ; }
  }
  # On failure retrieve error message/s.
  return array( false, $errors ) ; 
}