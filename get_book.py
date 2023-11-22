import os
import json
# assign directory
directory = '/var/www/html/Liberary/book/'

def catalog(directory)-> list:
    # Рeкурсивная функция возвращает тематику и название файла

    case = []
    for filename in os.listdir(directory):
        
        f = os.path.join(directory, filename)
        
        # checking if it is a file
        if os.path.isfile(f):
            case.append('/'.join(f.split('/')[5:]))
        elif os.path.isdir(f):
            case.append(
                {
                    f.split('/')[-1]: catalog(f)
                }
            )
    
    if case != []:
        return case

def write_inJson()-> None:
    get_list_catalog = catalog(directory=directory)
    
    with open('metadata/data.json', 'w') as fileJS:
        json.dump(get_list_catalog, fileJS, indent=4, ensure_ascii=False)

def main()-> None:
    write_inJson()


if __name__ == '__main__':
    main()
