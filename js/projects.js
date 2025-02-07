const technologies = {
    "HTML": "./icons/html.svg",
    "CSS": "./icons/css.svg",
    "JavaScript": "./icons/js.svg",
    "Bootstrap": "./icons/bootstrap.svg",
    "Java": "./icons/java.svg",
    "C#": "./icons/csharp.svg",
    "Python": "./icons/python.svg",
    "MongoDB": "./icons/mongodb.svg",
    "Express": "./icons/express.svg",
    "React": "./icons/react.svg",
    "NodeJS": "./icons/nodejs.svg",
    "GitHub": "./icons/github.svg",
    "Git": "./icons/git.svg",
    "Django": "./icons/django.svg",
    "Azure": "./icons/azure.svg",
    "SQL": "./icons/sql.svg",
}

const links = {
    "minesweeper": `https://davidandbar.github.io/minesweeper/`,
    "data_formatter": `https://davidandbar.github.io/Formatter/`,
    "to_do_list": `https://thankful-forest-0df18890f.4.azurestaticapps.net/`
}

const projects = {
    "Minesweeper": {
        "id": "minesweeper",
        "subtitles": {
            "Overview": {
                "text": `This project it’s an interactive interface emulating the classic Microsoft Minesweeper using HTML, CSS, JavaScript, and JQuery; Also, icons were imported from FontAwesome. Check it <a href=${links["minesweeper"]}>here!</a>`
            },
            "How it works": {
                "text": `You can choose between 4 different difficulties: Beginner, Easy, Intermediate, and Expert. Each cell has a number that tells you how many bombs that cell has in its surroundings. Try to discover all the non-bomb cells.`
            },
            "Instructions for web": {
                "list": ["Left-click: Discover the cell.", "Right-click Flag/unflag cell."]
            },
            "Instructions for mobile": 
            {"list": ["Tap: Discover the cell.", "Hold a cell: Flag/unflag cell."]}
        },
        "bottom": {
            "text": "*Click in the slider to safely flag the bombs with one tap! (or with the left click in the web)"
        }
    },
    "Data Formatter": {
        "id": "data_formatter",
        "subtitles": {
            "Overview": {
                "text": `The Separator Transformer Tool is a simple, intuitive webpage that allows users to transform their data from one delimiter format to another effortlessly. Whether you’re dealing with CSV files, text lists, or any other type of data, this tool makes reformatting quick and seamless.`
            },
            "How it works": {
                "list": [
                    "Input Your Data: Paste your data into the input field, regardless of its current separator (e.g., commas, spaces, semicolons, etc.).",
                    "Select Current Separator: Choose the separator currently used in your data from a dropdown menu or by typing it.",
                    "Choose New Separator: Specify the desired separator (e.g., periods, dashes, or custom characters).",
                    "Transform: Click the “convert” button to instantly convert your data into the new format.",
                    "Copy: Easily copy the transformed data."
                ]
            },
            "Example": {
                "list": [
                    "Input: 1,2,3,4,5,6 (Comma-separated)", 
                    "Desired Separator: . (Period)",
                    "Output: 1.2.3.4.5.6"
            ]
            },
            "Features": {
                "list": [
                    "User-friendly interface for quick data transformation.", 
                    "Support for custom separators (e.g., tabs, pipes).",
                    "Option to save transformed data for reuse."
                ]
            },
            "Audience": {"text": `This tool is ideal for professionals, students, and developers working with structured data, making data cleaning and formatting tasks more efficient. Open it <a href="${links["data_formatter"]}">here</a>.`}
        },
        "Features": {
            "text": "*Click in the slider to safely flag the bombs with one tap! (or with the left click in the web)"
        }
    },
    "To-Do-List": {
        "id": "to_do_list",
        "subtitles": {
            "Overview": {
                "text" : `This To-Do List is a powerful and secure task management webpage designed to help the user to stay organized and productive. With features like user authentication, support for multiple lists, and seamless cross-device synchronization, this application makes task management simple and efficient. Also, responsive design was used to ensure the a mobile-friendly layout.`
            },
            "Key Features": {
                "text": ``
            },
            "User Authentication": {
                "list": [
                    "Secure sign-up and login system to protect your data.",
                    "Passwords encrypted for maximum security.",
                    "Option for social media login or two-factor authentication (optional)."
                ]
            }, 
            "Multiple Lists Management": {
                "list": [
                    "Create and manage unlimited to-do lists for different projects or purposes.",
                    "Add, edit, mark as complete, or delete tasks effortlessly",
                ]
            },
            "Cloud-Based Data Storage": {
                "list": [
                    "Data is stored securely in a MongoDB database, ensuring your lists are always safe and accessible.",
                    "Synchronization across all devices."
                ]
            },
            "User-Friendly Interface": {
                "text": "Modern, responsive UI built with React for smooth navigation."
            },
            "Hosting and Deployment": {
                "text": "Frontend and backend hosted on Azure, ensuring high availability, scalability, and performance."
            },
            "Technologies Used": {
                "list": ["Frontend: React (for dynamic and responsive user interfaces).",
                    "Backend: Express.js (for secure and scalable API endpoints).",
                    "Database: MongoDB (for efficient and flexible data storage).",
                    "Hosting: Azure (for hosting both backend and frontend)."
                ]
            }
        }, 
    }
}

const workExperience = [
    {
        "title": "Math Tutor",
        "company": "Mathnasium, Toronto, ON",
        "date": "August 2023 – Present",
        "description": [
            "Deliver math instruction to students, tailoring teaching methods to individual learning styles",
            "Motivate students to achieve academic goals through personalized coaching and support",
            "Break down challenging problems into manageable steps to facilitate a better understanding",
            "Designed step-by-step problem-solving techniques to help students grasp complex concepts"
        ]
    },
    {
        "title": "Warranty Coordinator",
        "company": "Enercare, Toronto, ON",
        "date": "January 2024 – October 2024",
        "description": [
            "Managed and resolved warranty claims, ensuring precise documentation and system updates to improve process transparency",
            "Collaborated with suppliers and internal teams to streamline warranty workflows, achieving faster resolution times.",
            "Designed and documented detailed workflows for new claim processes, paving the way for process automation and system integration.",
            "Conducted root cause analysis to identify inefficiencies, implementing automated solutions to enhance operational workflows."
        ]
    },
    {
        "title": "Statistics Assistant",
        "company": "Team Foods, Barranquilla, Colombia",
        "date": "May 2021 – April 2023",
        "description": [
            "Performed data entry and analysis using ERP systems, contributing to precise inventory management and decision-making.",
            "Designed and implemented data management mechanisms, reducing data processing times and improving operational efficiency.",
            "Led plant operations on occasion, coordinating stock management, ensuring smooth collaboration among team members.",
            "Created reports and dashboards to present KPIs, providing actionable insights to stakeholders."
        ]
    },
    {
        "title": "Quality Control Monitor",
        "company": "AGR Group, Barranquilla, Colombia",
        "date": "January 2021 – April 2021",
        "description": [
            "Conducted real-time monitoring of sales representatives to ensure adherence to company standards, compliance protocols, and service quality expectations.",
            "Delivered constructive feedback to team members, fostering improvement overall performance.",
            "Ensured compliance with organizational values and guidelines, contributing to a consistent and professional customer experience.",
            "Worked closely with sales, training, and QA teams to align goals and maintain process efficiency."
        ]
    },
    {
        "title": "Sales Representative",
        "company": "AGR Group, Barranquilla, Colombia",
        "date": "January 2020 – December 2020",
        "description": [
            "Engaged with potential customers using clear and concise communication, addressing inquiries and providing tailored solutions to meet their needs.",
            "Maintained accurate records of customer interactions, ensuring seamless follow-ups.",
            "Promoted to Quality Control Monitor after demonstrating exceptional organizational, communication, and problem-solving skills in a high-pressure environment."
        ]
    }
]
