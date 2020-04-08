<?php
$cookie_name='loggedin';
$cookie_value=true;
if(isset($_COOKIE[$cookie_name]) && $_COOKIE[$cookie_name] == $cookie_value) {
  $file = '../../.env';
  $file_lines = file($file);
  $host_name = trim($file_lines[0]);
  $database = trim($file_lines[1]);
  $user_name = trim($file_lines[2]);
  $password = trim($file_lines[3]);

  $connect = mysqli_connect($host_name, $user_name, $password, $database);
  $method = $_SERVER['REQUEST_METHOD'];
  $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

  if (mysqli_connect_errno()) {
    die('<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>');
  } else {
    switch ($method) {
        case 'GET':
          $sql = "select * from grocerylist";
          break;
        case 'POST':
          $id = $_POST['id'];
          $item = mysqli_real_escape_string($connect, $_POST['item']);
          $quantity = $_POST['quantity'];
          $removed = $_POST['removed'];
          $update = $_POST['update'];
          if ($update == 1) {
            $sql = "update grocerylist set removed = $removed where id = $id";
          } elseif ($update == 2) {
            $sql = "update grocerylist set item = '$item', quantity = $quantity where id = $id";
          } else {
            $sql = "insert into grocerylist (id, item, quantity) values ($id, '$item', $quantity)";
          }
          break;
        case 'DELETE':
          $id = $_GET['id'];
          $sql = "delete from grocerylist where id = $id";
          break;
    }

    $result = mysqli_query($connect, $sql);

    if(!$result) {
      die(mysqli_error($connect));
    }

    if($method == 'GET') {
      if(!$id) echo '[';
      for ($i=0; $i<mysqli_num_rows($result); $i++){
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
      }
      if(!$id) echo ']';
    } elseif ($method == 'POST') {
        echo mysqli_affected_rows($connect);
    } else {
        echo mysqli_affected_rows($connect);
    }

    $connect->close();
  }
}
?>