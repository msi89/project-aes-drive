from os import name, path
from rest_framework import serializers
from .models import Document, Folder
from core.contrib.serializers import FolderRelatedField, FileRelatedField, ParentRelatedField


class FolderSerializer(serializers.ModelSerializer):
    children = FolderRelatedField(many=True, read_only=True)
    documents = FileRelatedField(many=True, read_only=True)
    # parent = ParentRelatedField(read_only=True)
    # foo = serializers.SerializerMethodField()
    # tree = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ('id', 'uuid', 'name', 'parent', 'children', 'path',
                  'is_private', 'documents', 'owner', 'created_at', 'updated_at', 'is_deleted', 'deleted_at')

    def get_foo(self, obj):
        return "Foo id: %i" % obj.pk

    # def get_tree(self, obj):
    #     if obj is None:
    #         return []
    #     folder = Folder.objects.get(pk=obj.id)
    #     result = self.get_tree(folder.parent_id)
    #     result.append(folder)
    #     return result


class CreateFoldetSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=True)
    parent = serializers.IntegerField(required=True)

    def validate(self, attrs):
        parent = attrs.get('parent', 0)
        if not Folder.objects.filter(id=parent).exists():
            raise serializers.ValidationError(
                {'parent': ('parent is directory is not valid')})
        return super().validate(attrs)


class UploadSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=200, required=False)
    directory = serializers.IntegerField(required=False)
    file = serializers.FileField()

    def validate(self, attrs):
        directory = attrs.get('directory')
        if directory is not None:
            if not Folder.objects.filter(id=directory).exists():
                raise serializers.ValidationError(
                    {'directory': ('directory not valid')})
        return super().validate(attrs)


class DownloadSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=200, required=False)


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        # fields = '__all__'
        fields = ['id', 'name', 'size', 'is_private', 'is_favorite', 'owner', 'url', 'path',
                  'directory', 'created_at', 'updated_at']


class UpdateFileSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200, required=False)
    password = serializers.CharField(max_length=200, required=False)
    directory = serializers.IntegerField(required=False)
    encrypted = serializers.BooleanField(required=False)
    decrypted = serializers.BooleanField(required=False)
