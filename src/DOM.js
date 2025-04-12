/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    while (count > 0) {
        const elem = document.createElement(tag);
        elem.innerHTML = content;
        document.body.append(elem);
        count--;
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let vert = [];
    let root;
    for (let i = 1; i <= level; i++) {
        if (i == 1) {
            root = document.createElement('div');
            root.className = 'item_' + i;
            document.body.append(root);
            vert.push(root);
        } else {
            let count = vert.length;
            while (count > 0) {
                let parent = vert.shift();
                for (let j = 0; j < childrenCount; j++) {
                    const div = document.createElement('div');
                    div.className = 'item_' + i;
                    parent.append(div);
                    vert.push(div);
                }
                count--;
            }
        }
    }
    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    let nodesTwoLevel = tree.getElementsByClassName('item_2');

    for (let node of nodesTwoLevel) {
        // let clone = node.cloneNode(true).childNodes;
        let clone = Array.from(node.childNodes).map((child) =>
            child.cloneNode(true),
        );
        const section = document.createElement('section');
        section.className = 'item_2';

        for (let child of clone) {
            section.append(child);
        }

        node.replaceWith(section);
    }

    return tree;
}
