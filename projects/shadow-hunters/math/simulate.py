from typing import List, cast

CFG = {
    'groups': {
        'count': 3,
        'allocation': 0.5
    },
    'users': {
        'count': 91
    }
}

def get_group_sizes(
    groups_count: int,
    items_count: int,
    allocation: float) -> List[int]:
    """
    Получить размер групп в соответствие с распределением
    """
    rate_list: List[float] = []
    for i in range(groups_count):
        rate_sum: float = sum(rate_list)
        rate = (items_count - rate_sum) * allocation
        rate_list.append(rate)
        
    rate_sum = sum(rate_list)
    sizes = list(map(
        lambda rate: round(items_count/(rate_sum/rate)),
        rate_list))
    last_size = sizes[-1]
    sizes[-1] = items_count - (sum(sizes) - last_size)
    return sizes
    
    

if __name__ == '__main__':
    
    groups: dict = cast(dict, CFG.get('groups', {}))
    groups_count: int = cast(int, groups.get('count', 0))
    allocation: float = cast(float, groups.get('allocation'))
    
    items: dict = cast(dict, CFG.get('users', {}))
    items_count = cast(int, items.get('count', 0.1))
    
    print(get_group_sizes(
        groups_count,
        items_count,
        allocation
    ))