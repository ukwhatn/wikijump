<?php

namespace Wikidot\DB;




use Ozone\Framework\Database\BaseDBPeer;

/**
 * Base peer Class mapped to the database table ozone_lock.
 */
class OzoneLockPeerBase extends BaseDBPeer
{
    public static $peerInstance;

    protected function internalInit()
    {
        $this->tableName='ozone_lock';
        $this->objectName='Wikidot\\DB\\OzoneLock';
        $this->primaryKeyName = 'key';
        $this->fieldNames = array( 'key' );
        $this->fieldTypes = array( 'key' => 'varchar(100)');
        $this->defaultValues = array();
    }

    public static function instance()
    {
        if (self::$peerInstance == null) {
            $className = 'Wikidot\\DB\\OzoneLockPeer';
            self::$peerInstance = new $className();
        }
        return self::$peerInstance;
    }
}
