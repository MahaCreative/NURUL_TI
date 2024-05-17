<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Response</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(45deg, #8500ff, #5acaff);
            height: 100vh;
        }

        #container {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url("http://192.168.10.1/NURUL/public/Image/bg.jpg"), #151729;
            box-shadow: 0 15px 30px rgba(0, 0, 0, .5)
        }

        #container .content {
            max-width: 600px;
            text-align: center;
        }

        #container .content h2 {
            font-size: 18vw;
            color: #fff;
            line-height: 1em;
        }

        #container .content h4 {
            position: relative;
            font-size: 1.5em;
            margin-bottom: 20px;

            background: #fff;
            font-weight: 300;
            padding: 10px 20px;
            border-radius: 10px;
            box-shadow: 0 15px 30px rgba(0, 0, 0, .5);
            display: inline-block;
        }

        #container .content p {
            position: relative;
            font-size: 1.2em;
            margin-bottom: 20px;
            color: #fff;
        }

        #container .content a {
            position: relative;
            display: inline-block;
            padding: 10px 25px;
            color: #fff;
            background: #ff0562;
            text-decoration: none;
            margin-top: 25px;
            border-radius: 25px;
            border-bottom: 4px solid #d00d56;
        }
    </style>
</head>

<body>
    <div id="container">
        <div class="content">
            <h2>401</h2>
            <h4>Opps ! Anda Gagal Login</h4>
            <p>Silahkan mengisi form isian dengan benar untuk dapat login ke sistem.</p>
            <a href="">Kembali</a>
        </div>
    </div>

</body>

</html>
