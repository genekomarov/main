from typing import Dict
from enum import Enum

class LinkTypeException(Exception): pass
class HasLinkException(Exception): pass

TLinkName = str
TId = int

class Entity:
    id: TId

class LINK_TYPE(Enum):
    SINGLE=1
    MULTY=2

class Links:
    type: LINK_TYPE
    __links: Dict[TId, Entity] = {}
    
    def __init__(self, type: LINK_TYPE):
        self.type = type
        
    def add(self, entity: Entity):
        id = entity.id
        if self.__links.get(id):
            raise HasLinkException(f'''Связь по id: {id} уже существует''')
        self.__links[id] = entity
        

class Linked:
    links: Dict[TLinkName, Links]
    
    def createLinks(self,
        linkName: TLinkName,
        linkType: LINK_TYPE,
        entity: Entity):
        
        links = self.links.get(linkName)
        if links:
            if links.type != linkType:
                raise LinkTypeException('''
                    Тип созвадаваемой ссылки отличается от текущего типа
                ''')
        else:
            self.links[linkName] = Links(linkType)
            
        links = self.links[linkName]
        links.add(entity)
        
                
class LinkedEntity(Linked, Entity):
    pass


def make_link(
    linkName: TLinkName,
    firstEntity: LinkedEntity,
    secondEntity: LinkedEntity,
    firtstLinkType: LINK_TYPE,
    secondLinkType: LINK_TYPE):
    
    firstEntity.createLinks(linkName, secondLinkType, secondEntity)
    secondEntity.createLinks(linkName, firtstLinkType, firstEntity)