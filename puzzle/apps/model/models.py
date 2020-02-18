from django.db import models
from puzzle.utils.models import BaseModel


class Model(BaseModel):

    class Meta:
        db_table = 'puzzle_model'

    @property
    def block(self):
        try:
            mb = ModelBlock.objects.get(model=self)
            block = mb.block.id
        except:
            block = None
        return block

    @block.setter
    def block(self, value):
        from puzzle.apps.block.models import Block
        block = value
        if isinstance(value, int):
            try:
                block = Block.objects.get(id=value)
            except:
                pass
        try:
            mb = ModelBlock.objects.get(model=self)
            mb.block = block
            mb.save()
        except:
            mb = ModelBlock.objects.create(block=block, model=self)


class ModelBlock(models.Model):
    block = models.OneToOneField(
        'block.Block',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    model = models.OneToOneField(
        Model,
        on_delete=models.CASCADE,
    )

    class Meta:
        db_table = 'puzzle_model_block'
