from typing import Dict
from enum import Enum

TLinkName = str
TId = int

class Entity:
    id: TId
    
EntityHash = Dict[TId, Entity]

class LINK_TYPE(Enum):
    SINGLE=1
    MULTY=2

class Links:
    type: LINK_TYPE
    __links: Dict[TId, Entity]
    def __init__(self, type: LINK_TYPE):
        self.type = type
        

class Linked:
    links: Dict[TLinkName, Links]
    
class LinkedEntity(Linked, Entity):
    pass