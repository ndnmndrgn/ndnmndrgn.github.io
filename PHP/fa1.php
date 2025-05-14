<?php
// Portfolio Info
$name = "Nadine Tatiana T. Mondragon";
$email = "ndnmndrgn@gmail.com";
$course = "BSITWMA";
$year = "2nd Year – Programming";
$title = "Student Web Developer";

$skills = ["HTML", "CSS", "PHP", "JavaScript", "Python"];
$projects = [
    [
        "title" => "Student Portfolio Website",
        "description" => "A portfolio page showcasing my skills and projects using PHP, HTML, and CSS."
    ],
    [
        "title" => "Simple Login System",
        "description" => "A login and registration system created using PHP and MySQL."
    ]
];
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $name; ?> - Portfolio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f0f0f0;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            color: #2c3e50;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            padding: 5px 0;
        }

        .project {
            margin-bottom: 20px;
        }

        .project-title {
            font-weight: bold;
            font-size: 18px;
        }

        .section-title {
            margin-top: 30px;
            font-size: 20px;
            color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><?php echo $name; ?></h1>
        <h2><?php echo $title; ?></h2>
        <p><strong>Email:</strong> <?php echo $email; ?></p>
        <p><strong>Course:</strong> <?php echo $course; ?></p>
        <p><strong>Year Level:</strong> <?php echo $year; ?></p>

        <div class="section-title">Skills</div>
        <ul>
            <?php foreach ($skills as $skill): ?>
                <li><?php echo $skill; ?></li>
            <?php endforeach; ?>
        </ul>

        <div class="section-title">Projects</div>
        <?php foreach ($projects as $project): ?>
            <div class="project">
                <div class="project-title"><?php echo $project['title']; ?></div>
                <div class="project-description"><?php echo $project['description']; ?></div>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>
