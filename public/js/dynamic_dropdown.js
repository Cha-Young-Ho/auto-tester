document.addEventListener('DOMContentLoaded', () => {
    const countInput = document.getElementById('count');
    const dynamicDropdowns = document.getElementById('dynamic_dropdowns');

    countInput.addEventListener('input', () => {
        const count = parseInt(countInput.value);
        dynamicDropdowns.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const dropdownContainer = document.createElement('div');
            dropdownContainer.id = "taskDropdown";
            const osDropdown = createDropdown('OS', ['Ubuntu', 'Amazon Linux', 'Redhat', 'CentOS'], i);
            const specDropdown = createDropdown('Spec', ['t1', 't2', 't3', 't4', 't5'], i);
            const regionDropdown = createDropdown('Region', ['Seoul', 'Germany', 'Tokyo'], i);

            dropdownContainer.appendChild(osDropdown);
            dropdownContainer.appendChild(specDropdown);
            dropdownContainer.appendChild(regionDropdown);

            dynamicDropdowns.appendChild(dropdownContainer);
        }
    });

    function createDropdown(labelText, options, index) {
        const label = document.createElement('label');
        label.textContent = labelText + ': ';

        const select = document.createElement('select');
        select.classList.add('task-content');
        select.setAttribute('id', labelText + index);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            optionElement.value = option;
            select.appendChild(optionElement);
        });

        const dropdownContainer = document.createElement('div');
        dropdownContainer.appendChild(label);
        dropdownContainer.appendChild(select);

        return dropdownContainer;
    }

    document.getElementById('submit_button').addEventListener('click', () => {
        // 인스턴스 그룹 이름과 카운트를 가져옴
        const groupName = document.getElementById('group_name').value;
        const count = parseInt(document.getElementById('count').value);
    
        // 각 드롭다운에서 선택된 값을 가져옴
        const dataValues = [];
        for (let i = 0; i < count; i++) {
            const osDropdown = document.getElementById(`OS${i}`);
            const specDropdown = document.getElementById(`Spec${i}`);
            const regionDropdown = document.getElementById(`Region${i}`);
            dataValues.push({'os': osDropdown.value, 'spec':specDropdown.value, 'region':regionDropdown.value});
        }
    
        // 서버로 보낼 데이터 객체 생성
        const formData = {
            group_name: groupName,
            count: count,
            content: dataValues
        };
    
        // AJAX 요청 보내기
        fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(window.location.href = '/task/list')
        .then(data => {
            console.log(data);
            // 요청 완료 후 필요한 동작 수행
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});