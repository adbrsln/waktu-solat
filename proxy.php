<?php
/**
 * Simple Proxy to bypass CORS for JAKIM e-Solat API
 * Endpoints:
 * - zones (if needed, but we have them local)
 * - prayer times: ?zone=CODE
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$zone = $_GET['zone'] ?? null;

if (!$zone) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Zone parameter is required"]);
    exit;
}

$api_url = "https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=" . urlencode($zone);

$response = @file_get_contents($api_url);

if ($response === FALSE) {
    http_response_code(502);
    echo json_encode(["status" => "error", "message" => "Failed to fetch data from JAKIM"]);
    exit;
}

echo $response;
?>
