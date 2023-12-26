// don't change anything below this line, unless you know what you're doing
var title,
	url = WScript.Arguments(0),
    match = /^phpstorm:\/\/open\/?\?(url=file:\/\/|file=)(.+)&line=(\d+)$/.exec(url),
    project = '',
    editor;

configureToolboxSettings();

if (match) {

    var shell = new ActiveXObject('WScript.Shell'),
        file_system = new ActiveXObject('Scripting.FileSystemObject'),
        file = decodeURIComponent(match[ 2 ]).replace(/\+/g, ' '),
        search_path = file.replace(/\//g, '\\');

    while (search_path.lastIndexOf('\\') !== -1) {
        search_path = search_path.substring(0, search_path.lastIndexOf('\\'));

        if (file_system.FileExists(search_path + '\\.idea\\.name')) {
            project = search_path;
            break;
        }
    }

    if (project !== '') {
        editor += ' "%project%"';
    }

    editor += ' --line %line% "%file%"';

    var command = editor.replace(/%line%/g, match[ 3 ])
        .replace(/%file%/g, file)
        .replace(/%project%/g, project)
        .replace(/\//g, '\\');

    shell.Exec(command);
    shell.AppActivate(title);
}

function configureToolboxSettings() {
    var shell = new ActiveXObject('WScript.Shell'),
        appDataLocal = shell.ExpandEnvironmentStrings("%localappdata%"),
        toolboxDirectory = appDataLocal + '\\Programs\\PhpStorm\\bin\\';

    // Reference the File collection of the Text directory

    title = 'PhpStorm';

    editor = '"' + toolboxDirectory + '\\phpstorm64.exe"';
}
