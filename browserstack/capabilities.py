browsers = [
    {
        "browserName": "Edge",
        "browserVersions": ["latest", "latest-1", "latest-2"],
        "oss": [
            {
                "os": "Windows",
                "osVersions": ["10", "11"],
            }
        ]
    },
    {
        "browserName": "Chrome",
        "browserVersions": ["latest", "latest-1", "latest-2"],
        "oss": [
            {
                "os": "Windows",
                "osVersions": ["10", "11"],
            },
            {
                "os": "OS X",
                "osVersions": ["Big Sur", "Monterey"],
            }
        ]
    },
    {
        "browserName": "Firefox",
        "browserVersions": ["latest", "latest-1", "latest-2"],
        "oss": [
            {
                "os": "Windows",
                "osVersions": ["10", "11"],
            },
            {
                "os": "OS X",
                "osVersions": ["Big Sur", "Monterey"],
            }
        ]
    },
    {
        "browserName": "Safari",
        "browserVersions": ["latest"],  #NB Only 1 Safari version supported per Mac OS, eg Mojave: 12.1, Monterey: 15.3, specifying 'latest' will pick up the right Safari version for each OS version 
        "oss": [
            {
                "os": "OS X",
                "osVersions": ["Mojave", "Catalina", "Big Sur", "Monterey"],
            }
        ]
    },
]
