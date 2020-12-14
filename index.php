<html>
<style>
    #customers {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    #customers td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
    }

    #customers tr:nth-child(even){background-color: #f2f2f2;}

    #customers tr:hover {background-color: #ddd;}

    #customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #4CAF50;
    color: white;
    }

    #customers td {
        text-align: center;
    }
</style>
<!-- <head>AudioVisual Website</head> -->
<body>
    <!-- <img src="apple.png" alt="apple image">  -->
    
<?php 
    $foldername = "test_speech_results_final";
    $a = scandir($foldername);
    ?>
    <table id="customers">
    <tr>
        <th>Image</th>
        <th>Original Audio</th>
        <th>Ground truth inference</th>
        <th>kldiv inference</th>
        <th>mse inference</th>
    </tr>
    <?php
    for ($i=2; $i < count($a); $i++) { 
        if(is_dir($foldername."/".$a[$i])) {
            // echo($a[$i]."<br>");
            // mp3
            // jpg
            // _ground_inference
            // _kldiv_inference
            // mseloss_inference
            $prefix = $foldername."/".$a[$i]."/";
            $id=$a[$i];
            $audio = $prefix.$id.".mp3";
            $img = $prefix.$id.".jpg";
            $ginf = $prefix.$id."_ground_inference.wav";
            $kldiv_inf = $prefix.$id."_kldiv_inference.wav";
            $mse_inf = $prefix.$id."mseloss_inference.wav"
            ?>
            <tr>
                <td><img src="<?php echo $img ?>" alt="<?php echo $id ?>" width=100 height=100></td>
                <td><audio controls><source src="<?php echo $audio ?>" type="audio/mpeg"></audio></td>
                <td><audio controls><source src="<?php echo $ginf ?>" type="audio/wav"></audio></td>
                <td><audio controls><source src="<?php echo $kldiv_inf ?>" type="audio/wav"></audio></td>
                <td><audio controls><source src="<?php echo $mse_inf ?>" type="audio/wav"></audio></td>
            </tr>
            <?php
        }
    } ?>
    </table>
    
</body>
<!-- <script>
    /**
     * Print a file's metadata.
     *
     * @param {String} fileId ID of the file to print metadata for.
     */
        function printFile(fileId) {
            var request = gapi.client.drive.files.get({
                'fileId': fileId
            });
            request.execute(function (resp) {
                console.log('Title: ' + resp.title);
                console.log('Description: ' + resp.description);
                console.log('MIME type: ' + resp.mimeType);
            });
        }

        /**
         * Download a file's content.
         *
         * @param {File} file Drive File instance.
         * @param {Function} callback Function to call when the request is complete.
         */
        function downloadFile(file, callback) {
            if (file.downloadUrl) {
                var accessToken = gapi.auth.getToken().access_token;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', file.downloadUrl);
                xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
                xhr.onload = function () {
                    callback(xhr.responseText);
                };
                xhr.onerror = function () {
                    callback(null);
                };
                xhr.send();
            } else {
                callback(null);
            }
        }
</script> -->
</html>

<!--Link for the google drive :  https://drive.google.com/drive/folders/1VqgJT68Rc6Z9LyLvNTpbjsIstiSetlWs -->